export interface Task{
    id:string,
    name:string,
    description:string,
    comments?:string[],
    projectId:string,
    assignedTo?:string,
    status:'pending' | 'inProgress' | 'completed'
}