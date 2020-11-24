import React from 'react'
import { useAmiibo } from './hook'
import { renderHook } from '@testing-library/react-hooks'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ShowAmiibo } from './hook'

describe('amiibo hook', () => {

  beforeEach(async () => {
  })

  it('returns the amiibo', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAmiibo())
    await waitForNextUpdate()
    expect(result.current).toBe(1)
  })
  fit('show amiibo', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: () => 'src' }));
    render(<ShowAmiibo name='zelda' />)
    await waitFor(() => screen.getByAltText('zelda'))
    expect(screen.getByAltText('zelda')).toBeTruthy();
  })
})

 