/// <reference types="cypress" />
import commonData from "../fixtures/commonData.json";
describe("Homework - stub network", () => {
  it("Create boards", () => {
    cy.intercept("/api/boards", { fixture: "fourBoards.json" }).as("newBoards");
    cy.visit("/");
    cy.wait("@newBoards").then((data) => {
      expect(data.response.body[0].name).to.eq(commonData.board.toDo);
      expect(data.response.body[1].name).to.eq(commonData.board.inProgress);
      expect(data.response.body[1].starred).to.eq(true);
      expect(data.response.body[2].name).to.eq(commonData.board.qa);
      expect(data.response.body[3].name).to.eq(commonData.board.done);
      expect(data.response.statusCode).to.eq(200);
    });
  });
  it("Create list in QA board", () => {
    cy.intercept(`/api/boards/${commonData.board.qaId}`, {
      fixture: "qaList.json",
    }).as("qaList");
    cy.get(`div[data-id="board_${commonData.board.qaId}"]`).click();
    cy.wait("@qaList").then((data) => {
      expect(data.response.body.id).to.eq(commonData.board.qaId);
      expect(data.response.body.name).to.eq(commonData.board.qa);
      expect(data.response.body.starred).to.eq(false);
      expect(data.response.body.lists[0].boardId).to.eq(commonData.board.qaId);
      expect(data.response.body.lists[0].id).to.eq(commonData.list.newListId);
      expect(data.response.body.lists[0].title).to.eq(commonData.list.newList);
      expect(data.response.statusCode).to.eq(200);
    });
  });
  it("Create tasks in QA board's list", () => {
    cy.intercept(`/api/boards/${commonData.board.qaId}`, {
      fixture: "qaBoardListTasks.json",
    }).as("qaTasksInList");
    cy.reload();
    cy.wait("@qaTasksInList").then((data) => {
      expect(data.response.statusCode).to.eq(200);
      expect(data.response.body.id).to.eq(commonData.board.qaId);
      expect(data.response.body.name).to.eq(commonData.board.qa);
      expect(data.response.body.starred).to.eq(false);
      expect(data.response.body.lists[0].boardId).to.eq(commonData.board.qaId);
      expect(data.response.body.lists[0].id).to.eq(commonData.list.newListId);
      expect(data.response.body.lists[0].title).to.eq(commonData.list.newList);
      expect(data.response.body.tasks[0].boardId).to.eq(commonData.board.qaId);
      expect(data.response.body.tasks[0].id).to.eq(commonData.task.stubbingId);
      expect(data.response.body.tasks[0].title).to.eq(commonData.task.stubbing);
      expect(data.response.body.tasks[0].listId).to.eq(
        commonData.list.newListId
      );
      expect(data.response.body.tasks[1].boardId).to.eq(commonData.board.qaId);
      expect(data.response.body.tasks[1].id).to.eq(
        commonData.task.changingPartsId
      );
      expect(data.response.body.tasks[1].title).to.eq(
        commonData.task.changingParts
      );
      expect(data.response.body.tasks[1].listId).to.eq(
        commonData.list.newListId
      );
      expect(data.response.body.tasks[2].boardId).to.eq(commonData.board.qaId);
      expect(data.response.body.tasks[2].id).to.eq(
        commonData.task.interceptingId
      );
      expect(data.response.body.tasks[2].title).to.eq(
        commonData.task.intercepting
      );
      expect(data.response.body.tasks[2].listId).to.eq(
        commonData.list.newListId
      );
      console.log(data);
    });
  });
});
