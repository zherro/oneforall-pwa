import UpdateCategoryStatus from "@supabaseutils/model/dto/request/UpdateCategoryStatus.dto";
import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import httpResponse from "@utils/http/HttpResponse";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const updateCategoryStatus: UpdateCategoryStatus = await request.json();

    const repository = new CategoriesRepository();
    repository.updateCategoryStatus(updateCategoryStatus);

    return httpResponse.accepted();
  }