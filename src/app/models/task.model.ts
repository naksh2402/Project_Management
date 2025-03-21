export interface Task{
    id?:string;
    title:string;
    description:string;
    projectId:string;
    comments?:string[];
    deadline:string;
    assignedUserId:string;
    status:'pending' | 'inProgress' | 'completed'
}