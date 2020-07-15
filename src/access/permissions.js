export const path_role_permissions = {
    '/admin': ['manager', 'update'],
    '/userlist': ['manager', 'update'],
    '/users': ['manager', 'update', 'view'],
    '/userprofile': ['manager', 'update', 'view'],
    '/editaffix': ['manager','update'],
    '/deleteaffix': ['manager', 'update'],
    '/home' : ['*'],
}

export const path_role_field_permissions = {
    '/spelling': {
        'all_fields': ['root', 'reichard', 'english', 'doak'],
        'view': ['root', 'reichard', 'english']
    }
}