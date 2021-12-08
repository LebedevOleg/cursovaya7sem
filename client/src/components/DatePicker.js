import axios from "axios";
import React, { useState, useContext } from "react";
import { useMessage } from "../hooks/alert.hook";
import { AuthContext } from "../context/authContext";
import {
  DatePickerComponent,
  DateTimePickerComponent,
  RenderDayCellEventArgs,
} from "@syncfusion/ej2-react-calendars";

export class DateTimeSelect {
  disabledDate(args) {
    args.isDisabled = true;
  }
  render() {
    return (
      <DateTimePickerComponent
        name="date_Start"
        placeholder="Дата начала импорта"
        format="yyyy/MM/dd HH:mm"
        renderDayCell={this.disabledDate}
      ></DateTimePickerComponent>
    );
  }
}
