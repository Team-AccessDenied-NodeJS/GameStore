const { expect } = require('chai');

it('should return 4', ()=> {
    // Arrange
    const x = 2;
    const y = 2;

    // Act
    const expected = x + y;

    // Assert
    expect(expected).to.eq(4);
});

it('should return 15', ()=> {
    // Arrange
    const x = 5;
    const y = 3;

    // Act
    const expected = x * y;

    // Assert
    expect(expected).to.eq(15);
});