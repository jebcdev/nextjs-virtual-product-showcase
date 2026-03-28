export interface IGeneralResponse<T = undefined> {
    success: boolean;
    error?: boolean;
    message: string;
    data?: T;
}