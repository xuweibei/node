// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

// 示例 1：

// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
// 示例 2：

// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]
// 示例 3：

// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// 暴力求解法
// function twoSum(arr, target) {
//   if (arr instanceof Array) {
//     const arr2 = JSON.parse(JSON.stringify(arr))
//     const arr3 = []
//     for (let i = 0; i < arr.length; i++) {
//       for (let j = i; j < arr2.length; j++) {
//         if (arr[i] + arr2[j + 1] === target) {
//           arr3.push(i)
//           arr3.push(j + 1)
//         }
//       }
//     }
//     console.log(arr3)
//     return arr3
//   }
// }
// twoSum([2, 7, 11, 15], 9)

// 查找求解法 哈希表
const twoSum = (nums, target) => {
  const prevNums = {} // 存储出现过的数字，和对应的索引

  for (let i = 0; i < nums.length; i++) {
    // 遍历元素
    const curNum = nums[i] // 当前元素
    const targetNum = target - curNum // 满足要求的目标元素
    const targetNumIndex = prevNums[targetNum] // 在prevNums中获取目标元素的索引
    if (targetNumIndex !== undefined) {
      // 如果存在，直接返回 [目标元素的索引,当前索引]
      return [targetNumIndex, i]
    } else {
      // 如果不存在，说明之前没出现过目标元素
      prevNums[curNum] = i // 存入当前的元素和对应的索引
    }
  }
}
twoSum([2, 7, 11, 15], 9)
