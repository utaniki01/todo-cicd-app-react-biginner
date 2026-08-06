import { describe, expect, test } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Todoアプリ!" })
    ).toBeInTheDocument();
  });
  test("TODOを追加することができる",()=>{
    render(<App />);
    const input =screen.getByRole("textbox",{name:"新しいタスクを入力"});
    const addButton=screen.getByRole("button",{name:"追加"});

    fireEvent.change(input,{target:{value:"テストタスク"}});
    fireEvent.click(addButton);

    const list=screen.getByRole("list");
    expect(within(list).getByText("テストタスク")).toBeInTheDocument();
    });

    test("TODOを完了にすることができる",()=>{
     render(<App />);

    const input =screen.getByRole("textbox",{name:"新しいタスクを入力"});
    const addButton=screen.getByRole("button",{name:"追加"});

    fireEvent.change(input,{target:{value:"テストタスク1"}});
    fireEvent.click(addButton);

    const checkbox=screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    });
   test("完了したTODOの数が表示されている",()=>{
    render(<App />);

    const input =screen.getByRole("textbox",{name:"新しいタスクを入力"});
    const addButton=screen.getByRole("button",{name:"追加"});

    fireEvent.change(input,{target:{value:"テストタスク1"}});
    fireEvent.click(addButton);

    fireEvent.change(input,{target:{value:"テストタスク2" }});
    fireEvent.click(addButton);

    const checkbox=screen.getAllByRole("checkbox")[1];
    fireEvent.click(checkbox);

    expect(screen.getByText("完了済み: 1 / 2")).toBeInTheDocument();
   });

   test("TODOがない場合はTODOがないこと示すメッセージが表示されている",()=>{
     render(<App />)

     expect(screen.getByText("タスクがありません")).toBeInTheDocument();
     expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();
   
    });

    test("空のTODOは追加されない",()=>{
      render(<App />)

      const input =screen.getByRole("textbox",{name:"新しいタスクを入力"});
    const addButton=screen.getByRole("button",{name:"追加"});

    fireEvent.change(input,{target:{value:""}});
    fireEvent.click(addButton);
    
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });
});