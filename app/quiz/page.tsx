import QuestionCard from "@/components/QuestionCard";

const Quiz = () => {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <div className="flex-1">
                <QuestionCard />
            </div>
        </div>
    );
};

export default Quiz;
