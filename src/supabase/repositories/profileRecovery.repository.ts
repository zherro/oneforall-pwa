import SupabaseRepository from "@supabaseutils/types/repository";

export default class ProfileRecovery extends SupabaseRepository {

    constructor() {
        super("profile_recovery");
    }
}