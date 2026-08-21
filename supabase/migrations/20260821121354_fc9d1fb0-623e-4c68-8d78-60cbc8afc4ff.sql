INSERT INTO public.user_roles (user_id, role)
VALUES ('76954e96-141f-4c62-9b27-51c057778ee4', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;