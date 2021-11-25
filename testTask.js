const connection = {
    query (strings, ...arg) {
        const separator = '?'.repeat(arg[0].length).split('').join(', ');
        const text = strings.join(separator);

        return {
            text,
            values: arg.flat()
        }
    }
};

const getUserByIds = (ids) => {
    // result:
    // {
    //   text: `
    //     SELECT *
    //     FROM Users
    //     WHERE Id IN (?, ?, ?, ?)
    //   `,
    //   values: [ids[0], ids[1], ids[2], ids[3], ...]
    // }

    return connection.query`
    SELECT *
    FROM Users
    WHERE Id IN (${ids})
  `;
}

(async () => {
    const result = await getUserByIds([1, 2, 3, 4]);

    console.log(`result:\n${result.text}\n${JSON.stringify(result.values)}`);
})();
