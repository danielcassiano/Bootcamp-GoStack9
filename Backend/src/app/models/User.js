import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize){
        super.init( //inicie esta classe como pai
        {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize, //padrão 
        }
        );

        this.addHook('beforeSave', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8) //criptografia de dificuldade 8
            }
        });

        return this;
    }

    async checkPassword(password){
        return await bcrypt.compare(password, this.password_hash); //true caso as senhas comparadas batam
    }
}

export default User;