import { startOfWeek, endOfWeek, format, parse, parseISO } from 'date-fns'
import * as shiftRepository from "../database/default/repository/shiftRepository";
import { getRepository, FindOneOptions, MoreThanOrEqual, LessThanOrEqual, Not, IsNull } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift, IPublishShift } from "../shared/interfaces";
import { RequestQuery } from "@hapi/hapi";

export const isTimeOverlap = async (params: any, exceptId?: string) : Promise<boolean> => {
  let overlapCounterQuery = getRepository(Shift)
    .createQueryBuilder("shift")
    .where('shift.date = :date', {
      date: params.date
    })
    .andWhere('shift.startTime >= :startTime AND shift.startTime < :endTime', {
      startTime: params.startTime,
      endTime: params.endTime
    })
    .andWhere('shift.endTime > :startTime AND shift.endTime <= :endTime', {
      startTime: params.startTime,
      endTime: params.endTime
    })
  if(exceptId){
    overlapCounterQuery = overlapCounterQuery
    .andWhere('shift.id != :exceptId', {
      exceptId
    })
  }

  const overlapCounter = await overlapCounterQuery.getCount()

  return overlapCounter > 0
}

export const isWeekPublished = async (date: string) : Promise<boolean> => {
  const startDate = format(startOfWeek(new Date(date), { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const endDate = format(endOfWeek(new Date(date), { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const shiftPublishedCounter = await getRepository(Shift)
    .createQueryBuilder("shift")
    .where('shift.date >= :startDate AND shift.date <= :endDate', {
      startDate,
      endDate
    })
    .andWhere('shift.publishedAt IS NOT NULL')
    .getCount()
  
  return shiftPublishedCounter > 0
}

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

  if(await isWeekPublished(payload.date)) throw new Error('Week of this date has been published')
  const overlap = await isTimeOverlap({
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime
  })
  if(overlap) throw new Error('Time data overlap, make sure your input time not overlap')

  return shiftRepository.create(shift);
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  const shift = await shiftRepository.findById(id, {})
  const overlap = await isTimeOverlap({
    date: payload.date || shift.date,
    startTime: payload.startTime || shift.startTime,
    endTime: payload.endTime || shift.endTime
  }, id)
  if(await isWeekPublished(payload.date || shift.date)) throw new Error('Week of this date has been published')
  if(overlap) throw new Error('Time data overlap, make sure your input time not overlap')

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
