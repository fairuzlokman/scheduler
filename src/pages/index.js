import MyCalendar from "@/components/MyCalendar";
import Scheduler from "@/components/Scheduler"
import WeekDisplay from "@/components/WeekDisplay";

const Home = () => {
	return (
		<div className="flex flex-col h-screen gap-5 p-10">
			<p className="text-3xl font-semibold capitalize">scheduler</p>
			{/* <Scheduler/> */}
			<WeekDisplay/>
			{/* <MyCalendar/> */}
		</div>
	)
}

export default Home