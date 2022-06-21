-- CreateTable
CREATE TABLE "Todo" (
    "todoId" TEXT NOT NULL PRIMARY KEY,
    "listId" TEXT NOT NULL,
    "todo" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Todo_listId_fkey" FOREIGN KEY ("listId") REFERENCES "TodoList" ("todoListId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TodoList" (
    "todoListId" TEXT NOT NULL PRIMARY KEY,
    "todoListName" TEXT NOT NULL
);
