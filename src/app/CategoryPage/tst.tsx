import React from 'react'

const tst = () => {
  return (
    <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </Head>

  <div className="flex flex-wrap justify-center m-4 sm:m-6 md:m-10 gap-4 sm:gap-6">
    {dataLength > 0 ? (
      data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleOpenModal(item.id)}
          className="flex flex-col border rounded-2xl bg-white w-64 sm:w-72 md:w-80 lg:w-96 cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          {/* Top Section */}
          <div className="flex flex-row items-start gap-2 p-2">
            <div className="bg-gray-300 rounded-xl w-auto h-7 px-2 flex items-center">
              <span className="text-xl font-vazir flex items-center gap-1">
                {convertToPersianNumbers(item.average_rate)}
                <FaStar color="orange" />
              </span>
            </div>
            <div className="relative w-32 h-40 sm:w-36 sm:h-44 md:w-40 md:h-50">
              <Image
                className="rounded-2xl"
                src={item.photo_url}
                alt="productImg"
                layout="fill"
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="text-lg font-semibold text-center mt-2">
            {item.name}
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col items-end mt-2 gap-1 px-4">
            <div className="text-lg">
              {convertToPersianNumbers(
                Math.round(parseFloat(item.discounted_price)).toLocaleString()
              )}{" "}
              :قیمت
            </div>
            {item.discount > 0 && (
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 text-white text-sm px-2 rounded-md">
                  %{convertToPersianNumbers(item.discount)}
                </div>
                <div className="line-through text-gray-500">
                  {convertToPersianNumbers(
                    Math.round(parseFloat(item.price)).toLocaleString()
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="flex justify-center mt-4">
            {userdata[item.id] === undefined ||
            userdata[item.id] === null ||
            userdata[item.id] === 0 ? (
              <button
                className={`${
                  item.stock === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 hover:scale-105"
                } rounded-xl px-4 py-2 text-white`}
                onClick={() => handleAdd(item.id)}
                disabled={item.stock === 0}
              >
                افزودن
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className={`${
                    userdata[item.id] >= item.stock
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:scale-105"
                  } rounded-full text-white w-8 h-8 flex items-center justify-center`}
                  onClick={() => incrementQuantity(item.id)}
                  disabled={userdata[item.id] >= item.stock}
                >
                  +
                </button>
                <span className="text-lg">
                  {convertToPersianNumbers(userdata[item.id] || 0)}
                </span>
                <button
                  className="bg-red-500 text-white hover:scale-105 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => decrementQuantity(item.id)}
                  disabled={userdata[item.id] <= 1}
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center">No items found</div>
    )}
    {isOpen && (
      <ProductPage
        onClose={handleCloseModal}
        open={isOpen}
        itemid={selectedItem}
      />
    )}
  </div>
</>
  )
}

export default tst

