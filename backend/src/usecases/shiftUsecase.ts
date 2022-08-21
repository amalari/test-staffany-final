import * as shiftRepository from "../database/default/repository/shiftRepository";
import { getRepository, FindManyOptions, FindOneOptions, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift, IPublishShift } from "../shared/interfaces";
import { RequestQuery } from "@hapi/hapi";

export const find = async (params: RequestQuery): Promise<Shift[]> => {
  return getRepository(Shift)
    .createQueryBuilder("shift")
    .where('shift.date >= :startDate AND shift.date <= :endDate', {
      startDate: params.startDate,
      endDate: params.endDate,
    })
    .orderBy({
      "shift.date": "DESC",
      "shift.startTime": "ASC"
    })
    .getMany()
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};

export const create = async (payload: ICreateShift): Promise<Shift> => {
  const shift = new Shift();
  shift.name = payload.name;
  shift.date = payload.date;
  shift.startTime = payload.startTime;
  shift.endTime = payload.endTime;

  return shiftRepository.create(shift);
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  const shift = await shiftRepository.findById(id, {})
  if(shift.publishedAt) throw new Error("cannot update published shift")
  return shiftRepository.updateById(id, {
    ...payload,
  });
};

export const publish = async (
  payload: IPublishShift
) => {
  const result = await getRepository(Shift)
    .createQueryBuilder()
    .update({
      publishedAt: new Date()
    })
    .where('shift.date >= :startDate AND shift.date <= :endDate', {
      startDate: payload.startDate,
      endDate: payload.endDate,
    })
    .returning('*')
    .execute()
  return result.raw[0];
};

export const deleteById = async (id: string | string[]) => {
  let deletedIds;
  if(Array.isArray(id)){
    deletedIds = [...id]
  } else {
    deletedIds = [id]
  }
  for (const id of deletedIds) {
    const shift = await shiftRepository.findById(id as string, {})
    if(shift.publishedAt) throw new Error("cannot delete published shift")  
  }

  return shiftRepository.deleteById(id);
};
