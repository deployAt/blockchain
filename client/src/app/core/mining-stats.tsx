import React, { useState, useEffect, FC } from 'react'
import socketIOClient from 'socket.io-client'
import { CONFIG } from '../../config'

export const MiningStats: FC = () => {
  const [miningStats, setMiningStats] = useState<any>([])

  useEffect(() => {
    const socket = socketIOClient(CONFIG.API_URL)
    socket.on('FromAPIMine', (data) => {
      setMiningStats((prevStats) => {
        const stats = prevStats.length > 5 ? prevStats.pop() : prevStats
        return [data].concat(stats)
      })
    })
    return () => socket.disconnect()
  }, [])

  return (
    <div className="mining">
      <h2>Mining</h2>
      <div className="mining-list">
        {miningStats.map(({ hash, hashBinary, difficulty, nonce, timestamp }) => (
          <div key={hash}>
            <div>Hash binary: {hashBinary}</div>
            <div>Hash hex: {hash}</div>
            <div>Difficulty: {difficulty}</div>
            <div>Nonce: {nonce}</div>
            <div>Time: {new Date(timestamp).toLocaleString()}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}
