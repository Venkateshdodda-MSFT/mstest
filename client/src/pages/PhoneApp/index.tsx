const PhoneApp = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#343a40]">Spice Delight</h1>
            <p className="text-lg text-[#343a40]">Your gateway to a world of fresh and delicious recipes delivered fast!</p>
        </header>
        <main className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
            <img src="/phone-app.jpg" alt="Spice Delight App" className="w-64 h-64 object-cover mb-4 rounded-md" />
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#343a40] mb-2">Introducing Our New App - Coming Soon!</h2>
                <p className="text-[#343a40] mb-4">
                    Spice Delight offers a wide variety of menu items and recipes that are fresh and delivered fast.
                    With our new app, you can:
                </p>
                <div className="flex justify-center align-items">
                    <ul className="max-w-[15rem] list-disc list-inside text-left text-[#343a40]">
                        <li>Browse selections</li>
                        <li>Log on to your account</li>
                        <li>Place orders</li>
                        <li>And more!</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
)

export default PhoneApp