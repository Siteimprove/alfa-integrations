import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";

@Component({
  selector: "lib-testLibrary",
  imports: [],
  template: ` <p>test-library works!</p> `,
  styles: ``,
})
export class TestLibrary {}

describe("TestLibrary", () => {
  it("should create", () => {
    const fixture = TestBed.createComponent(TestLibrary);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
