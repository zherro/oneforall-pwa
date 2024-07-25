-- criar permissões

insert into rbac.role(name, active)
values
    ('principal', true),
    ('teacher', true),
    ('student', true);
    
insert into rbac.permission(type, object)
values
    ('SELECT', 'GRADES'),
    ('INSERT', 'GRADES'),
    ('UPDATE', 'GRADES'),
    ('DELETE', 'GRADES');


-- criar permissions das roles
