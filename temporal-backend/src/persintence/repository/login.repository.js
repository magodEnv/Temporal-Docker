import { Login } from '../models/Login.js';

export async function getLogin_() {
    try {
        const login = await Login.findAll({
            attributes: [
                'id',
                'username',
                'password',
                'email',
            ],
            order: [['id', 'DESC']],
        });
        return login;
    } catch (error) {
        console.log(error);
        throw new Error('Sucedio un error......');
    }
}

export async function updateLogin_(login) {
    const { id, username, password, email } = login;
    try {
        const login_update = await Login.findByPk(id);
        if (!login_update) {
            throw new Error('Proyecto no encontrado.');
        }
        login_update.username = username;
        login_update.password = password;
        login_update.email = email;
        await login_update.save();
        return 'Proyecto actualizado';
    } catch (error) {
        throw new Error('Sucedio un error......');
    }
}