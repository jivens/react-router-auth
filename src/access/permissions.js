export const path_role_permissions = {
    '/admin': ['admin'],
    '/userlist': ['admin'],
    '/users': ['admin', 'view'],
    '/userprofile': ['admin', 'view'],
    '/home' : ['*'],
}

export const path_role_field_permissions = {
    '/spelling': {
        'all_fields': ['root', 'reichard', 'english', 'doak'],
        'view': ['root', 'reichard', 'english']
    }
}