import React, { useState } from "react";

// önerilen başlangıç stateleri
//const initialMessage = ''
//const initialEmail = ''
//const initialSteps = 0
//const initialIndex = 4 //  "B" nin bulunduğu indexi

const initialState = {
  message: "",
  email: "",
  steps: 0,
  index: 4,
};

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [state, setState] = useState(initialState);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.

    let x = (state.index % 3) + 1;
    let y = Math.floor(state.index / 3) + 1;

    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    setState(initialState);
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    if (yon === "left" && getXY().x !== 1) {
      setState({
        ...state,
        index: state.index - 1,
        steps: state.steps + 1,
        message: "",
      });
    } else if (yon === "right" && getXY().x !== 3) {
      setState({
        ...state,
        index: state.index + 1,
        steps: state.steps + 1,
        message: "",
      });
    } else if (yon === "up" && getXY().y !== 1) {
      setState({
        ...state,
        index: state.index - 3,
        steps: state.steps + 1,
        message: "",
      });
    } else if (yon === "down" && getXY().y !== 3) {
      setState({
        ...state,
        index: state.index + 3,
        steps: state.steps + 1,
        message: "",
      });
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const { id } = evt.target;

    if (getXY().x === 1 && id === "left") {
      setState({
        ...state,
        message: "Sola gidemezsiniz!",
      });
    } else if (getXY().x === 3 && id === "right") {
      setState({
        ...state,
        message: "Sağa gidemezsiniz!",
      });
    } else if (getXY().y === 1 && id === "up") {
      setState({
        ...state,
        message: "Yukarıya gidemezsiniz!",
      });
    } else if (getXY().y === 3 && id === "down") {
      setState({
        ...state,
        message: "Aşağıya gidemezsiniz!",
      });
    } else {
      sonrakiIndex(id);
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    const { value } = evt.target;

    setState({
      ...state,
      email: value,
    });
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar (2, 2)</h3>
        <h3 id="steps">0 kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === 4 ? " active" : ""}`}>
            {idx === 4 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">SOL</button>
        <button id="up">YUKARI</button>
        <button id="right">SAĞ</button>
        <button id="down">AŞAĞI</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
