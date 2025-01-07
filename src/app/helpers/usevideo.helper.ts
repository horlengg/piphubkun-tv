export function videoDurationPretter(totalSecond: number): string {
    if(!totalSecond) return '00:00'
    const hours = Math.floor(totalSecond / 3600); // Calculate hours
    const minutes = Math.floor((totalSecond % 3600) / 60); // Calculate remaining minutes
    const seconds = Math.floor(totalSecond % 60); // Remaining seconds

    if (hours > 0) {
        // Format as HH:MM:SS
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        // Format as MM:SS
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }
}
