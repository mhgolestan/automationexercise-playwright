export function randomCountry(): string {
    const countries = [
        "India",
        "United States",
        "Canada",
        "Australia",
        "Israel",
        "New Zealand",
        "Singapore"
    ]

    return countries[Math.floor(Math.random() * countries.length)];
}