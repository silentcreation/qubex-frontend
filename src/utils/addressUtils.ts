export function shortenAddress(address: string): string {
    const addr = address.toUpperCase();
    const prefix = addr.substring(0, 6);
    const suffix = addr.substring(addr.length - 4);
    return `${prefix}...${suffix}`;
}