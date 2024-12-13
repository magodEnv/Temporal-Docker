const InputImage = ({
  handleImageUpload,
  handleImageDelete,
  imagePreviews,
  error,
  isResearcher,
}) => {
  //console.log("Formato img: "+ imagePreviews);
  return (
    <div>
      <div className="bg-slate-700 rounded-sm shadow-sm mt-1 flex flex-col">
        <div className="bg-slate-900 flex p-2 justify-between">
          <label className="text-lg font-light">Images</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer p-1 px-3 text-center rounded-md bg-slate-500 hover:bg-slate-700"
          >
            Browse
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex flex-wrap gap-3 p-3">
          {!isResearcher ? (
            imagePreviews.map((image, index) => (
              <ImagenCard
                key={index}
                image={image}
                onClick={(event) => handleImageDelete(image, event)}
              />
            ))
          ) : (
            <ImagenCard
              image={imagePreviews}
              onClick={
                isResearcher
                  ? handleImageDelete
                  : (event) => handleImageDelete(image, event)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ImagenCard = ({ image, onClick }) => {
  return (
    <div className="relative inline-block">
      <img
        src={image}
        alt="Project image"
        className="w-24 h-24 object-cover rounded"
      />
      <div
        className="absolute flex -top-1 -right-1 h-6 w-6 justify-center items-center cursor-pointer bg-red-600 rounded-full"
        onClick={onClick}
      >
        <p className="text-white">&times;</p>
      </div>
    </div>
  );
};

export default InputImage;
