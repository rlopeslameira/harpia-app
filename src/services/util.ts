class Util {

    public static getFirstAndLastName = (fullName: string): string => {
        const names = fullName.split(" ");
        const firstName = names[0];
        const lastName = names.length > 1 ? names[names.length - 1] : '';
        return firstName + ' ' + lastName;
    }
}

export default Util;
