

export const convertFormaterDate = (objectDate: any ): string =>  {
    const date = new Date(objectDate.year, objectDate.month , objectDate.day);
    const fecha = date.toISOString().split('T')[0];
    return fecha;
}




