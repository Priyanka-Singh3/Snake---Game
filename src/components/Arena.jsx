import { Link } from "react-router-dom";

export default function Arena() {
  return (
    <div className="bg-gradient-to-br from-cyan-100 to-blue-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-cyan-900 mt-10 mb-8 tracking-wide">Gaming Arena</h1>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
        {/* Snake Game Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center hover:scale-105 transition-transform duration-200">
          <img src="/snake_.png" alt="Snake Game" className="rounded-xl w-48 h-48 object-cover mb-4 shadow"/>
          <h2 className="text-2xl font-bold text-cyan-800 mb-2">Snake Game</h2>
          <p className="text-gray-700 mb-4 text-center">
            Classic snake game with modern UI, speed control, and bonus items. Eat, grow, and beat your high score!
          </p>
          <Link to="/snake" className="px-6 py-2 bg-cyan-700 text-white rounded-lg font-bold text-lg shadow hover:bg-cyan-800 transition-colors duration-200">
            Play
          </Link>
        </div>
        {/* Coming Soon Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center opacity-70 cursor-not-allowed">
          <div className="rounded-xl w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 text-5xl text-gray-400">🎮</div>
          <h2 className="text-2xl font-bold text-gray-500 mb-2">Game 2</h2>
          <p className="text-gray-400 mb-4 text-center">A new exciting game is on the way. Stay tuned!</p>
          <span className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold text-lg shadow">Coming Soon</span>
        </div>
        {/* Coming Soon Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center opacity-70 cursor-not-allowed">
          <div className="rounded-xl w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 text-5xl text-gray-400">🕹️</div>
          <h2 className="text-2xl font-bold text-gray-500 mb-2">Game 3</h2>
          <p className="text-gray-400 mb-4 text-center">Another fun game will be available soon. Check back later!</p>
          <span className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold text-lg shadow">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}