export const path_role_permissions = {
    '/admin': ['update'],
    '/userlist': ['update'],
    '/users': ['update', 'view'],
    '/userprofile': ['update', 'view'],
    '/home' : ['*'],
}

export const path_role_field_permissions = {
    '/spelling': {
        'all_fields': ['root', 'reichard', 'english', 'doak'],
        'view': ['root', 'reichard', 'english']
    }
}