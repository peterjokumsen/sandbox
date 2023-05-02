import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: "sandbox-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "basic-crud";
}
