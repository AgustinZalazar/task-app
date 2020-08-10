import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTask: ITask[] = [...tasks];
    newTask[i].done = !newTask[i].done;
    setTasks(newTask);
  };

  const removeTask = (i: number): void => {
    const newTask: ITask[] = [...tasks];
    newTask.splice(i , 1);
    setTasks(newTask);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                  ref= { taskInput }
                />
                <button
                  className="btn btn-primary btn-block mt-2"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div key={i} className=" card card-body mt-2">
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <button
                className="btn btn-success btn-block"
                onClick={() => toggleDoneTask(i)}
              >
                {t.done ? "✗" : "✓"}
              </button>
              <button className="btn btn-danger mt-2" onClick={() => removeTask(i)}>
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
