import ReviewsCard from "./ReviewCard";

export default function ReviewsList(props: { reviews: any }) {
    return (
        <>
            {props.reviews != null ? (
        <div>
          {props.reviews.map((ratings: any, index: number) => {
            return (
              <div className="mb-2" key={index}>
                <ReviewsCard
                  score={ratings.score}
                  comment={ratings.comment}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-breta-blue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="black"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </>
      )}
        </>
    )
}