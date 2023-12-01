import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'kishore',
        email:'kishore@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'hari',
        email:'hari@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
];

export default users;