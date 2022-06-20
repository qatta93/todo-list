-- CreateTable
CREATE TABLE "Todo" (
    "todoId" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    CONSTRAINT "Todo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TodoList" ("todoListId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TodoList" (
    "todoListId" TEXT NOT NULL PRIMARY KEY,
    "todoListName" TEXT NOT NULL
);
