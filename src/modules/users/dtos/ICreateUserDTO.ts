export interface ICreateUserDTO {
  name: string;
  email: string;
  avatar: string;
  socket_id: string;
  id?: string;
  created_at?: Date;
}