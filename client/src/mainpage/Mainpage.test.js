import React from "react";
import { render, screen } from "@testing-library/react";
import Mainpage from "./Mainpage";
import Note from "./Note";

test("renders sample value in Note component", () => {
const testClass={
    "id": "56472f1a-15e7-48f8-8458-b7353059c4e8",
    "name": "Nope",
    "noteSize": 3,
    "notes": [
        {
            "content": "<p>[object Object][object Object]https://notepad.io/sharelink/https://notepad.io/sharelink/sdkfjhsdkjfsdkfjhsdkjfhttp://locahttps://notepad.io/sharelink/sdkfjhsdkjflhost/[object Object][object Object]https://notepad.io/sharelink/https://notepad.io/sharelink/sdkfjhsdkjfsdkfjhsdkjfhttp://locahttps://notepad.io/sharelink/sdkfjhsdkjflhost/</p>\n<p>https://notepad.io/sharelink/sdkfjhsdkjfhttps://notepad.io/sharelink/sdkfjhsdkjf</p>\n<p>&nbsp;</p>\n<p>https://notepad.io/sharelink/sdkfjhsdkjf</p>\n<p>soignowaiuiwoniasguagiuqerhgiuqergiuqerhngiuerghhghhuirehgiuhruighuhuhgjsdngjngj</p>",
            "id": "f0a59d55-0882-40e3-8a66-95c2a614df70",
            "title": "Testtttt"
        },
        {
            "content": "<p>JHGJHGFJHGFJHGFJHGFJHGFHGFGHFHGFHGFHGFHGFHGFHGFHGFHGFHGFHGFHGFHGFHGFHsdfsdfsdfsdfsdfsdfsdfsdfbsdfhsjhdfksjdhfksjdhfksjdhfksjdhfksjdhfksjdhfksjdhfksjdhfksdjhfksdjhfksjdhfdjfGFHGFHGFJHGFHGFHGFHGFHGFHGFHGhttps://notepad.io/sharelink/sdkfjhsdkjfFFFFFhttps:/https://notepad.io/sharelink/sdkfjhsdkjf/notepad.io/sharelink/sdkfjhsdkjf</p>",
            "id": "bf06ac9a-f221-4fc8-806c-bb8441e08bff",
            "title": "Test"
        }
    ]
};
const testNote={
       
    "content": "",
    "id": "bd2abf8f-7e30-41eb-8268-a417a6dfc4a5",
    "title": "new Note"
    };


  render(
 
          <Mainpage>
            <Note SelectedClass={testClass} SelectedNote={testNote} />
          </Mainpage>
  
  );

  const sampleValueElement = screen.getByText(sampleValue);
  expect(sampleValueElement).toBeInTheDocument();
});
