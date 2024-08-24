import { NextRequest } from "next/server";
import SupabaseRepository from "./types/repository";
import { LOG } from "@utils/log";
import httpResponse from "@utils/http/HttpResponse";
import { UserData } from "./model/user/UserData";

export class SupabaseCrudService {
  private repository: SupabaseRepository<any>;

  constructor(repository: SupabaseRepository<any>) {
    this.repository = repository;
  }

  createOrUpdate() {}
}

export class CrudService {
  private repository: SupabaseRepository<any>;

  constructor(repository: SupabaseRepository<any>) {
    this.repository = repository;
  }
  async createOrUpdate(request: NextRequest) {
    try {
      const formData = await request.json();
      formData.user_id = await this.repository.getUserId();

      LOG.debug("formData", formData);
      const { error } = await this.repository.save(formData);

      if (error) {
        LOG.error("Error on when save stores", error);
        return httpResponse.error();
      }

      return httpResponse.accepted();
    } catch (error) {
      LOG.error("Error processing request:", error);

      // Return an error response
      return httpResponse.error();
    }
  }

  async createOrUpdateWithTenant(request: NextRequest, payload?: any) {
    try {
      const formData = payload ? payload : await request.json();
      const user: UserData = await this.repository.getUser();

      formData.user_id = user?.id;
      formData.tenant_id = user?.user_metadata?.tenant?.id;

      LOG.debug("formData", formData);
      const { error, data } = await this.repository
        .save(formData)
        .select()
        .single();

      if (error) {
        LOG.error("Error on when save stores", error);
        return httpResponse.error();
      }

      return httpResponse.accepted(data);
    } catch (error) {
      LOG.error("Error processing request:", error);

      // Return an error response
      return httpResponse.error();
    }
  }

  async getById(uuid: string) {
    try {
      const { data, error } = await this.repository.findById(uuid).single();

      if (error) {
        LOG.error("Error on when save stores", error);
        return httpResponse.error();
      }

      return httpResponse.ok(data);
    } catch (error) {
      LOG.error("Error processing request:", error);

      // Return an error response
      return httpResponse.error();
    }
  }
}
