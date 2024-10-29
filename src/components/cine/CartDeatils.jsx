import { useContext } from "react";
import Delete from "../../assets/delete.svg";
import Checkout from "../../assets/icons/checkout.svg";
import { MovieContext } from "../../context/index";
import { getImgUrl } from "../../utils/cine-utility";

export default function CartDeatils({ onClose }) {
  const { cartData, setCartData } = useContext(MovieContext);

  function handleRemoveItem(event, id) {
    event.preventDefault();
    const newCartData = cartData.filter((item) => {
      return item.id !== id;
    });
    setCartData(newCartData);
  }

  return (
    <div class="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[790px] p-4 max-h-[90vh] overflow-auto">
        <div class="bg-white shadow-md dark:bg-[#12141D] rounded-2xl overflow-hidden p-5 md:p-9">
          <h2 class="text-2xl lg:text-[30px] mb-10 font-bold">Your Carts</h2>
          <div class="space-y-8 lg:space-y-12 max-h-[450px] overflow-auto mb-10 lg:mb-14">
            {cartData.length == 0 ? (
              <p>The Cart Item is Empty</p>
            ) : (
              cartData.map((item) => (
                <div key={item.id} class="grid grid-cols-[1fr_auto] gap-4">
                  <div class="flex items-center gap-4">
                    <img
                      class="rounded overflow-hidden"
                      src={getImgUrl(item.cover)}
                      alt={item.title}
                      width="100"
                      height="100"
                    />
                    <div>
                      <h3 class="text-base md:text-xl font-bold">
                        {item.title}
                      </h3>
                      <p class="max-md:text-xs text-[#575A6E]">{item.genre}</p>
                      <span class="max-md:text-xs">${item.price}</span>
                    </div>
                  </div>
                  <div class="flex justify-between gap-4 items-center">
                    <button
                      class="bg-[#D42967] rounded-md p-2 md:px-4 inline-flex items-center space-x-2 text-white"
                      onClick={(e) => handleRemoveItem(e, item.id)}
                    >
                      <img class="w-5 h-5" src={Delete} alt="delete" />
                      <span class="max-md:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div class="flex items-center justify-end gap-2">
            <a
              class="rounded-md p-2 md:px-4 inline-flex items-center space-x-2 bg-primary text-[#171923] text-sm"
              href="#"
            >
              <img src={Checkout} width="24" height="24" alt="Checkout" />
              <span>Checkout</span>
            </a>
            <a
              class="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm"
              href="#"
              onClick={onClose}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
