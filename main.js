(()=>{"use strict";var e=document.querySelector(".editor-form"),t=document.querySelector(".add-places"),n=document.forms.place__adder,o=Array.from(document.querySelectorAll(".popup__save-button"));function r(e){"Escape"===e.key&&_(document.querySelector(".popup_opened"))}function c(e){e?o.forEach((function(e){e.textContent="Сохранение..."})):o.forEach((function(e){e.textContent="Сохранить"}))}function a(e){e.reset()}var i={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-27",headers:{authorization:"08ca101b-72c0-46c7-a5af-c036f69dd465","Content-Type":"application/json"}};function u(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var s=document.querySelector("#name"),l=document.querySelector("#about-yourself"),d=document.querySelector(".profile"),f=d.querySelector(".profile__name"),p=d.querySelector(".profile__avatar"),m=d.querySelector(".profile__occupation");function v(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r)}function _(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r)}function h(e,t){e.setAttribute("disabled","disabled"),e.classList.add(t.inactiveButtonClass)}function y(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.removeAttribute("disabled"),e.classList.remove(t.inactiveButtonClass)}(t,n):h(t,n)}var b=document.querySelector(".image-popup"),S=document.querySelector(".image-popup__photo"),E=document.querySelector(".image-popup__text"),q=document.querySelector(".places"),L=document.querySelector("#place-name"),C=document.querySelector("#photo-link"),k=document.querySelector("#places__cards").content;function g(e,t,n,o,r){var c,a=k.querySelector(".places__cards").cloneNode(!0),s=a.querySelector(".places__name"),l=a.querySelector(".places__image"),d=a.querySelector(".places__like-icon"),p=a.querySelector(".places__like-counter"),m=a.querySelector(".places__delete-button");return s.textContent=e,l.src=t,l.alt=e+". Фото живописного места.",p.textContent=n,d.addEventListener("click",(function(e){var t;(t=r,fetch("".concat(i.baseUrl,"/cards/likes/")+"".concat(t),{method:"PUT",headers:i.headers}).then((function(e){return u(e)}))).then((function(e){d.classList.add("places__like-icon_enabled"),p.textContent=e.likes.length})).catch((function(e){return console.error(e)})),e.target.classList.contains("places__like-icon_enabled")&&function(e){return fetch("".concat(i.baseUrl,"/cards/likes/")+"".concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return u(e)}))}(r).then((function(e){p.textContent=e.likes.length,d.classList.remove("places__like-icon_enabled")})).catch((function(e){return console.error(e)}))})),o===f.textContent?((c=m).classList.remove("places__delete-button_inactive"),c.removeAttribute("disabled"),m.addEventListener("click",(function(){var e;(e=r,fetch("".concat(i.baseUrl,"/cards/")+"".concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return u(e)}))).then((function(e){m.closest(".places__cards").remove()})).catch((function(e){return console.error(e)}))})),l.addEventListener("click",(function(){v(b),S.src=l.src,S.alt=l.alt,E.textContent=s.textContent}))):function(e){e.classList.add("places__delete-button_inactive"),e.setAttribute("disabled","disabled")}(m),a}function x(e){q.prepend(e)}var A,T=document.querySelector(".profile__add-button"),U=Array.from(document.querySelectorAll(".popup")),P=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__image"),B=document.querySelector(".avatar"),N=B.querySelector("#avatar-link"),O=document.forms.avatar__change;A={formSelector:".popup__form",inputSelector:".popup__info",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__info-error",inputErrorTypeClass:"popup__info_type_error",activeInputErrorClass:"popup__info-error_active"},Array.from(document.querySelectorAll(A.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);y(n,o,t),e.addEventListener("reset",(function(){h(o,t)})),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorTypeClass),o.classList.remove(n.activeInputErrorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorTypeClass),r.textContent=n,r.classList.add(o.activeInputErrorClass)}(e,t,t.validationMessage,n)}(e,r,t),y(n,o,t)}))}))}(e,A)})),Promise.all([void fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return u(e)})).then((function(e){var t,n,o;t=e.name,n=e.avatar,o=e.about,f.textContent=t,p.src=n,m.textContent=o,s.value=t,l.value=o,d.prepend()})).catch((function(e){console.error(e)})),void fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return u(e)})).then((function(e){e.forEach((function(e){x(g(e.name,e.link,e.likes.length,e.owner.name,e._id))}))})).catch((function(e){console.error(e)}))]).catch((function(e){console.error(e)})),T.addEventListener("click",(function(){v(t)})),n.addEventListener("submit",(function(){var e,o;(e=L.value,o=C.value,fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:e,link:o})}).then((function(e){return u(e)}))).then((function(e){x(g(e.name,e.link,e.likes.length,e.owner.name,e._id)),_(t),a(n)})).catch((function(e){return console.error(e)}))})),w.addEventListener("click",(function(){v(B)})),O.addEventListener("submit",(function(){var e;c(!0),(e=N.value,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:e})}).then((function(e){return u(e)}))).then((function(e){var t;t=e.avatar,p.src=t,_(B),a(O)})).catch((function(e){console.error(e)})).finally((function(e){c(!1)}))})),P.addEventListener("click",(function(){v(e)})),e.addEventListener("submit",(function(){var t,n;c(!0),(t=s.value,n=l.value,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return u(e)}))).then((function(t){var n,o;n=t.name,o=t.about,f.textContent=n,m.textContent=o,_(e)})).catch((function(e){console.error(e)})).finally((function(e){c(!1)}))})),U.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target===e&&_(e),t.target.classList.contains("popup__close-button")&&_(e)}))}))})();