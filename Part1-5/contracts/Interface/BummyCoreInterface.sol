// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
interface BummyCoreInterface {
    //* BummyAccessControl
    function cooAddress() external returns(address);
    function setCEO(address _newCEO) external;
    function setCOO(address _newCOO) external;

    //* BummyBase
    //* All of functions are internal

    //* BummyOwnership
    /**
     * @dev 실수로 버미를 Core contract로 보냈을때 복구 시키는 함수입니다.
     * @param _bummyId 실수로 보내진 버미의 토큰 아이디
     * @param _recipient 받을 사람
     */
    function rescueLostBummy(uint256 _bummyId, address _recipient) external;

    //* BummyCheering
    function setBummyInfoAddress(address _address) external;
    function isReadyToCheer(uint256 _bummyId) external view returns (bool);
    /**
     * @notice 두 token이 응원이 가능한 상태인지 조회합니다.
     * @param _momId 엄마 토큰의 경우 QR을 보여주는 토큰
     * @param _dadId 아빠 토큰의 경우 QR을 찍은 토큰
     */
    function canCheerWith(uint256 _momId, uint256 _dadId) external view returns(bool); 

    /**
     * @notice 두 token이 응원합니다!
     * @param _momId 엄마 토큰의 경우 QR을 보여주는 토큰
     * @param _dadId 아빠 토큰의 경우 QR을 찍은 토큰
     */
    function cheerWith(uint256 _momId, uint256 _dadId) external;

    /**
     * @notice 엄마 토큰의 경우 QR이 찍히고(응원이 끝나고 나서) 탈진이 끝나고 새로운 버미를 데리고 옵니다.
     * 새로운 버미는 다른 버미들과 응원할 수 있습니다.
     * @param _momId 엄마 토큰의 경우 QR을 보여주는 토큰
     */
    function inviteFriend(uint256 _momId) external returns(uint256);

    //* BummyMinting
    /**
     * @notice 홍보용 버미를 만듭니다. CEO만 실행할 수 있습니다.
     * @param _genes 엄마 토큰의 경우 QR을 보여주는 토큰
     * @param _owner 토큰 주인의 address
     */
    function createPromoBummy(uint256 _genes, address _owner) external;
    /**
     * @notice 사람마다 0세대 버미를 만들 수 있습니다.
     */
    function createFirstBummy() external;

    //* BummyCore
    /**
     * @dev 컨트랙트 업그레이드했을때,컨트랙트 주소를 재설정합니다.
     * @param _v2Address 새로운 컨트랙트 주소
     */
    function setNewAddress(address _v2Address) external;
    /**
     * @dev 토큰 아이디를 넣으면 해당하는 버미에 대한 정보가 나옵니다.
     * @param _id token id
     * @return isGestating 
     * @return isReady 
     * @return cooldownIndex 
     * @return nextActionAt 
     * @return siringWithId 
     * @return birthTime 
     * @return momId 
     * @return dadId 
     * @return generation 
     * @return genes 
     */
    function getBummy(uint256 _id)
        external
        view
        returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 momId,
        uint256 dadId,
        uint256 generation,
        uint256 genes
    );
}