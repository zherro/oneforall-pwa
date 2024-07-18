import SupabaseRepository from "@supabaseutils/types/repository";
import bcrypt from 'bcryptjs';

export default class UserRepository extends SupabaseRepository<any> {
  constructor() {
    super("auth.users");
  }

  public async updatePassword(
    _secret_token: string,
    _code: string,
    password: string,
    id_recovery: string
  ) {
    console.log( {
      _secret_token: _secret_token,
      _code: _code,
      _new_password: password,
    })

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const { data, error: upddateError } = await this.supabase.rpc(
      "update_password_with_token",
      {
        _secret_token: _secret_token,
        _code: _code,
        _new_password: hash,
      }
    );

    return upddateError;
  }

  getByEmail(email: string | undefined) {
    return this.from.select().eq("email", email).limit(1);
  }
}
