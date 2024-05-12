"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

export const CreateOrder = async (data: Prisma.OrderCreateInput) => {
  return db.order.create({ data });
};
