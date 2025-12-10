import { unstable_noStore as noStore } from "next/cache";

// NOTE: Months are zero-indexed (0 is January, 5 is June)
export function calculateAge(birthdate: Date = new Date(2002, 5, 5)): number {
    noStore();
    const currentDate = new Date();

    const birthYear = birthdate.getFullYear();
    const currentYear = currentDate.getFullYear();

    let age = currentYear - birthYear;

    const birthMonth = birthdate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth &&
            currentDate.getDate() < birthdate.getDate())
    ) {
        age--;
    }

    return age;
}

export function calculateAgeParts(
    birthdate: Date = new Date(2002, 5, 5)
): string {
    noStore();
    const now = new Date();

    let years = now.getFullYear() - birthdate.getFullYear();
    let months = now.getMonth() - birthdate.getMonth();
    let days = now.getDate() - birthdate.getDate();

    // Fix negative days by borrowing from previous month
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }

    // Fix negative months by borrowing from previous year
    if (months < 0) {
        months += 12;
        years--;
    }

    return `${years}.${months}.${days}`;
}
