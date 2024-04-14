export interface ToDoModel{
    id?:string,
    timestamp:string,
    toDoID:string,
    title:string,
    description:string,
    stage:'To Do'|'In Progress'|'Done',
    difficulty:'Easy'|'Hard'|'Medium',
    user:string;
}