import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const envPath = path.join(projectRoot, '.env');
const normalizedProjectRoot = projectRoot.replace(/^C:\\C:\\/, 'C:\\');
const envPathFixed = path.join(normalizedProjectRoot, '.env');

function parseEnv(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const env = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    env[match[1]] = value;
  }

  return env;
}

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();

  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }

  if (!response.ok) {
    const msg = payload && typeof payload === 'object' && payload.error ? payload.error : payload;
    throw new Error(`Request failed (${response.status}): ${JSON.stringify(msg)}`);
  }

  return payload;
}

const env = parseEnv(envPathFixed);
const email = 'djawadisaindou@gmail.com';
const password = 'Licence2025';
const supabaseUrl = env.SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
}

const headers = {
  apikey: serviceRoleKey,
  Authorization: `Bearer ${serviceRoleKey}`,
  'Content-Type': 'application/json',
};

const listUsers = await request(`${supabaseUrl}/auth/v1/admin/users`, { headers });
const existing = listUsers.users?.find((user) => user.email === email);

let user;
if (existing) {
  user = existing;
  console.log(`User already exists: ${user.id}`);
} else {
  user = await request(`${supabaseUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
    }),
  });
  console.log(`Created user: ${user.id}`);
}

const roleTableUrl = `${supabaseUrl}/rest/v1/user_roles`;
const roleHeaders = {
  apikey: serviceRoleKey,
  Authorization: `Bearer ${serviceRoleKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

const existingRoles = await request(
  `${roleTableUrl}?select=user_id,role&user_id=eq.${user.id}&role=eq.admin`,
  { headers: roleHeaders },
);

if (existingRoles.length === 0) {
  await request(roleTableUrl, {
    method: 'POST',
    headers: roleHeaders,
    body: JSON.stringify({
      user_id: user.id,
      role: 'admin',
    }),
  });
  console.log(`Assigned admin role to ${email}`);
} else {
  console.log(`Admin role already exists for ${email}`);
}

console.log('Done.');
