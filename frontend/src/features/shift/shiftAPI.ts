import { AxiosAPI } from "../../utils/axios";

export type Shift = {
    id: string | number
    name: string
    date: string
    startTime: string
    endTime: string
    publishedAt: string | null
}

export type CreateShiftDTO =  {
    name: string
    date: string
    startTime: string
    endTime: string
}
export type UpdateShiftDTO =  {
    name?: string
    date?: string
    startTime?: string
    endTime?: string
}
export type PublishShiftsDTO = {
    startDate: string
    endDate: string
}

class ShiftAPI extends AxiosAPI {
    public async findMany(params: any = {}){
        try {
            const { data } = await this.axios.get("/shifts?order[date]=DESC&order[startTime]=ASC", {
                params
            })
            
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
    public async findById(id: string){
        try {
            const { data } = await this.axios.get(`/shifts/${id}`)
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
    public async createShift(payload: CreateShiftDTO){
        try {
            const { data } = await this.axios.post("/shifts", payload)
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
    public async updateById(id: string, payload: UpdateShiftDTO){
        try {
            const { data } = await this.axios.patch(`/shifts/${id}`, payload)
            
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
    public async publish(payload: PublishShiftsDTO){
        try {
            const { data } = await this.axios.patch(`/shifts`, payload)
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
    public async deleteById(id: string){
        try {
            const { data } = await this.axios.delete(`/shifts/${id}`)
            return data
        } catch (error) {
            throw new Error(this.getErrorMessage(error))
        }
    }
}

export default new ShiftAPI(process.env.REACT_APP_API_BASE_URL as string)