INSERT INTO
auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) (
select
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4 (),
    'authenticated',
    'authenticated',
    'user' || (ROW_NUMBER() OVER ()) || '@gmail.com',
    crypt ('password123', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{"name":"Apple","user_email":"apple@gmail.com","area":"all","user_type":"company","href":"https://www.apple.com/se/","keywords":["Frontend","Backend","Node.js","JavaScript","Typescript","SCSS","React","Next.js","Wireframing","Animation","Headless","Figma"],"location":[-117.185876,34.500831],"contact":"apple@gmail.com"}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
FROM generate_series(1, 100)
);